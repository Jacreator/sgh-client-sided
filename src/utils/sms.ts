import {
    SMS_SERVICE_PROVIDER,
    EBULK_URL,
    EBULK_SENDER_NAME,
    EBULK_USERNAME,
    EBULK_API_KEY,
    TERMII,
    HOLLATAGS,
    INTERSWITCH,
} from '@/config/config';
import axios from 'axios';
import httpStatus from 'http-status';

const sendSMS = async (payload: any) => {
    if (SMS_SERVICE_PROVIDER == 'ebluk') {
        // ebluk sms
        // http://api.ebulksms.com:8080/sendsms?username=your_email_address&apikey=your_apikey&sender=your_sender_name&messagetext=your_message&flash=0/1&recipients=2348123456789,2348123456789

        const result = await axios
            .get(
                `${EBULK_URL}username=${EBULK_USERNAME}&apikey=${EBULK_API_KEY}&sender=${EBULK_SENDER_NAME}&messagetext=${payload.message}&flash=0&recipients=234706300355`,
            )
            .then((body) => {
                return {
                    message: body,
                    code: body.status,
                };
            })
            .catch((err) => {
                console.error('error');
                return {
                    message: err,
                    code: httpStatus.NO_CONTENT,
                };
            });

        return result;
    } else if (SMS_SERVICE_PROVIDER == 'termii') {
        const result = await axios
            .post(TERMII.URL, {
                api_key: TERMII.API_KEY,
                to: cleanPhone({ number: payload.to }),
                from: TERMII.FROM,
                sms: `Your TaxitPay confirmation code is ${payload.message}. Valid for 10 minutes, one-time use only`,
                type: 'plain',
                channel: 'dnd',
            })
            .then((body) => {
                return {
                    message: body,
                    code: body.status,
                };
            })
            .catch((body) => {
                console.log(body);
            });
            return result;
    } else if (SMS_SERVICE_PROVIDER == 'interswitch') {
        const url = INTERSWITCH.url;
        const data = {
            "sms": {
                "dest": payload.to,
                "src": INTERSWITCH.source,
                "text": payload.message,
                "unicode": false
            },
            "account": {
                "password": INTERSWITCH.password,
                "systemId": INTERSWITCH.system_id
            }
        };
        const result = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((body) => {
                console.log(body);
                return {
                    message: body,
                    code: body.status,
                }
            })
            .catch((err) => {
                console.error('error');
                return {
                    message: err,
                    code: httpStatus.NO_CONTENT
                }
            });
        return result;
    } else if (SMS_SERVICE_PROVIDER == 'hollatags') {
        return await axios
            .post(HOLLATAGS.URL, {
                user: HOLLATAGS.USERNAME,
                pass: HOLLATAGS.PASSWORD,
                to: await cleanPhone({number: payload.to}),
                from: HOLLATAGS.FROM,
                msg: `Your TaxitPay confirmation code is ${payload.message}. Valid for 10 minutes, one-time use only`,
                type: 0
            })
            .then((body) => {
                return {
                    message: 'sms sent using hollatags',
                    code: body.status,
                };
            })
            .catch((body) => {
                console.log(body);
            });
    }

};

const cleanPhone = async (payload: { number: string }) => {
    return payload.number.replace('+', '');
};
export default sendSMS;
