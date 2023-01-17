import jsonwebtoken from 'jsonwebtoken';

// Errors
const errors = {
    validation: 'JSON-web-token validation failed.',
} as const;

// Options
const options = {
    expiresIn: '60000',
};

/**
 * Encrypt data and return jwt.
 */
function sign(data: string | object | Buffer): Promise<string> {
    return new Promise((res, rej) => {
      jsonwebtoken.sign(data, 'pk_test_LsRBKejzCOEEWOsw', options, (err, token) => {
        return err ? rej(err) : res(token || '');
      });
    });
}

// **** Export default **** //

export default {
    sign
} as const;