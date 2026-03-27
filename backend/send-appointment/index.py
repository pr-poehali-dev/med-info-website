"""
Отправка заявки на консультацию / вопроса врачу на email администратора.
"""
import os
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Invalid JSON'})}

    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    phone = body.get('phone', '').strip()
    question = body.get('question', '').strip()
    req_type = body.get('type', 'consultation')

    if not name or not email or not phone:
        return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Missing required fields'})}

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_pass = os.environ.get('SMTP_PASS', '')
    to_email = os.environ.get('ADMIN_EMAIL', smtp_user)

    type_label = 'Вопрос врачу' if req_type == 'question' else 'Запись на консультацию'

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #81B29A, #A7E0E0); padding: 20px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">МедИнфо — новая заявка</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0 0;">{type_label}</p>
      </div>
      <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">Имя:</td>
              <td style="padding: 8px 0; color: #111827; font-weight: 600;">{name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; color: #111827;"><a href="mailto:{email}" style="color: #3B7DD8;">{email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Телефон:</td>
              <td style="padding: 8px 0; color: #111827;">{phone}</td></tr>
          {"<tr><td style='padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;'>Вопрос/цель:</td><td style='padding: 8px 0; color: #111827;'>" + question + "</td></tr>" if question else ""}
        </table>
        <div style="margin-top: 20px; padding: 12px 16px; background: #E07A5F20; border-radius: 8px; border-left: 3px solid #E07A5F;">
          <p style="margin: 0; font-size: 13px; color: #374151;">Ответьте клиенту в течение рабочего дня.</p>
        </div>
      </div>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'[МедИнфо] {type_label} — {name}'
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.ehlo()
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True, 'message': 'Заявка отправлена'})
    }
