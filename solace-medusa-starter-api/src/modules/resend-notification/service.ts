import { ProviderSendNotificationDTO } from '@medusajs/types';
import { AbstractNotificationProviderService, MedusaError } from '@medusajs/framework/utils';

import { Resend } from 'resend';

import { validateModuleOptions } from '../../utils/validate-module-options';
import { OrderPlacedEmailTemplate } from './email-templates/order-placed';
import { ResetPasswordEmailTemplate } from './email-templates/reset-password';

type ModuleOptions = {
  apiKey: string;
  fromEmail: string;
  replyToEmail: string;
  toEmail: string;
  enableEmails: string;
};

export enum ResendNotificationTemplates {
  ORDER_PLACED = 'order-placed',
  RESET_PASSWORD = 'reset-password'
}

class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = 'resend-notification';
  private resend: Resend;
  private options: ModuleOptions;

  constructor(container, options: ModuleOptions) {
    super();
    validateModuleOptions(options, 'resendNotificationProvider');

    this.resend = new Resend(options.apiKey);
    this.options = options;
  }

  // Send mail
  private async sendMail(subject: string, body: any, toEmail?: string) {
    if (this.options.enableEmails.toLowerCase() !== 'true') {
      return {};
    }

    const { data, error } = await this.resend.emails.send({
      from: this.options.fromEmail,
      replyTo: this.options.replyToEmail,
      to: [toEmail ? toEmail : this.options.toEmail],
      subject: subject,
      react: body
    });

    if (error) {
      throw new MedusaError(MedusaError.Types.UNEXPECTED_STATE, error.message);
    }

    return data!;
  }

  // Send order placed mail
  private async sendOrderPlacedMail(notification: ProviderSendNotificationDTO) {
    const orderData = { order: notification?.data };
    const dynamicSubject = notification?.data?.subject as string;

    return await this.sendMail(
      dynamicSubject,
      OrderPlacedEmailTemplate({ data: orderData }),
      notification.to
    );
  }

  // Send reset password mail
  private async sendResetPasswordMail(notification: ProviderSendNotificationDTO) {
    const url = notification?.data?.url as string;
    const dynamicSubject = notification?.data?.subject as string;

    return await this.sendMail(
      dynamicSubject,
      ResetPasswordEmailTemplate({ url }),
      notification.to
    );
  }

  async send(notification: ProviderSendNotificationDTO) {
    switch (notification.template) {
      case ResendNotificationTemplates.ORDER_PLACED.toString():
        return await this.sendOrderPlacedMail(notification);

      case ResendNotificationTemplates.RESET_PASSWORD.toString():
        return await this.sendResetPasswordMail(notification);
    }

    return {};
  }
}

export default ResendNotificationProviderService;
