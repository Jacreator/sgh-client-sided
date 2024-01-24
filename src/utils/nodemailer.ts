import {POSTMARK_MAIL_TOKEN} from "@/config/config";
import fs from "fs";
import path from "path";

const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const postmarkTransport = require('nodemailer-postmark-transport');
const Handlebars = require('handlebars');

const transporter = nodemailer.createTransport(postmarkTransport({
    auth: {
        apiKey: POSTMARK_MAIL_TOKEN
    }
}));

transporter.verify((error: any, success: any) => {
    if (error) console.error(error);
});

const templatePath = path.join(__dirname, '../docs/templates/');
transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        layoutsDir: templatePath,
        defaultLayout: false,
        partialsDir: templatePath,
    }, viewPath: templatePath, extName: '.hbs'
}));

Handlebars.registerHelper('formatCurrency', function (value: any, locale: any, currencyCode: any) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
    }).format(Number(value));
});

export const sendEmailWithAttachment = (payload: any, subject: any, template: any) => {
    transporter.sendMail({
        from: 'tech@taxtech.com.ng',
        to: payload.user.employee_email,
        subject: subject,
        email: payload.user.employee_email,
        template: template,
        attachments: [{path: payload.user.url}],
        context: {
            data: payload,
            company: payload.company.name,
            company_email: payload.company.email
        },
    }, () => {
        console.log('Email sent: ');
    });
};


export const reportTransaction = (payload: any, amount: any, template: any) => {
    const context = {
        email: payload.email,
        account_type: payload.account_type,
        tire: payload.tire,
    }

    transporter.sendMail({
        from: 'tech@taxtech.com.ng',
        to: 'techprojects@taxtech.com.ng',
        // to: 'uyoobonga@gmail.com',
        subject: 'Alert! Transaction occur Over 1Million',
        email: 'tech@taxtech.com.ng',
        template: template,
        context: {
            data: context,
            amount: amount,
        },
    }, () => {
        console.log('Email sent: ');
    });
};

export const sendSalaryApproved = (padi: any, salary: any, company: any, template: any) => {


    const data = {
        first_name: padi.first_name,
        month: salary.month,
        company: company.entity_name,
    }

    transporter.sendMail({
        from: 'tech@taxtech.com.ng',
        to: padi.email,
        replyTo: "noreply@taxtech.com.ng",
        subject: 'Salary Approved',
        email: padi.email,
        template: template,
        context: { data: data },
    }, () => {
        console.log('Salary approved email sent');
    });
};
