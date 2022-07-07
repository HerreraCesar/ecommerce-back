import "dotenv/config";

export default {
  mongodb: {
    connectionString:
      "mongodb+srv://cesar:364788mg@cluster0.zbava.mongodb.net/ecommerce?retryWrites=true&w=majority",
  },
  firebase: {
    type: "service_account",
    project_id: "ecommerce-e1ce7",
    private_key_id: "f6d9ebae7c9684fcc74c345bba457cee8c05d985",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCbO5mRhDyQJLHR\nG6frfKAU1BVJktVCORDgk93XnLkiLRjhWhBKF1bxwlCvwuW6yegFlHQdxEUmAuzx\nmqjFogN9TUZamnAj/z5Gut3mY28KoLv8cMieUHZoVYc403d/Z4JW1RKJMIfw8xn3\nreSl1BbOE6K2ZwSWNTlw6pnQ7p10mKd6zPxOgLzVQq7gKL3jwxWMnTKRsmIzfu11\nUTOWrSld5FTFnbmE14Bz4EpOKrsZphMqxbiV1pMyTLBuk20plLThBYpI/aQclZzM\n7i5sa+WxzLCLV26lRqdRtZ42LiWz/qA3WfJdUljxETrfYFsxtOe3keiMYS/UCYtO\n4cLIZpmXAgMBAAECggEAB5bd3RkfrUjSySKDgd+/1qGmmshX4c5D1RIvOrJGwNt+\n+s5Tu1n+kU1+DJT7dOrkvst+JwU1Mw5Aj4opE/4ZEpOB5YsYZ9u73tEvz4Q7/3aF\nSlD1r5Vg4wMpD2FGiqjAw0Y7V90fprf6V7tQniTk3bvLBp6GjftzLMiWry02iIBp\nbMw7roXPRvzi95Vk2LJpNoc/6b+GCmyZ6mZXZYh5hxgzmZ33eXdOuBtiVffrjZMU\nMzK1qDkUk1HrOAyU2G1CSdXNiidVQ1OruqP7Q0URYDIos1+wmGEzRFO8hNfSqU/z\nVIsAKG5UM4/1CP81lv544B7nzIZLalDmAeFzHwmQmQKBgQDLI1In356+Q/d/UE2a\nLIQbiFLbmAu3Cj8SxH5ZP2O05+sRCORZrK1HAo+Ir1+UosJw8ZfeY9flye3TEgFa\n79tES/Xx72/ycnigb8jiVI0eJVLFSKnl4eUTUtNmHJuaicDpiMA3vkpMU6BDZXfh\n60s6bsQUBd11/0idI6AfTe4b3wKBgQDDoOzQO+qx/GIk26hzNvUwvEolChM36bgv\nVY1RenXNHiHD4CMs7laFVAhfp1J4nZbMVMyIWHZpfqN0JZ/9YzT11gS1Azfh8yky\nmv5c5EEAgrnYaPUkFi3vwYGMHSgQTbkAD391ZTf0DBQuiY52TXZ6mxusQTAaEy0y\noH5eXjQ5SQKBgEeISpfr8RSDDpZwisMtxd+EI9lcM1Pjcc6EDxISdmPv/yDihrbl\nTadhyXWSfA/1OI9ZI+eWNSKf9vWKs5t4NzhXn2XwsPUpRj0I4C6DI6Zn8juymNFw\nuKATXInqrQjAVYRnOXjns3YpRJg3FP4jQzxyYO3EGvZATSu4rdwYLy71AoGALnJe\nx3HyXx/VDXs5m2FJBbEuyWyC85uCJ3rgep/gqDqnOaJVt60+zZkOA+fuJMUFsK3R\nge2+730pwcHNIpQTVurhYzjIY9UfyuwRyGxJIp3nEgKZcV/yuCHxaBrkEDrj2afU\nU0Mc7cyQXhw6vsvVfXamM1em3AoBiSuh1TX4oEECgYBAAYATod/HBXnjX3b2wYHW\nCqJehKT4uclbzsY9eu2DDVZ91cXxn4VEJqBfMdhCXWzoaHZwBK9i/Ew8StiOwnAh\nioxkOCdXk4x3Dlxu1p1MNIT9lYtyaLx5nBDdI7NRbMn9Un7R14bevtGZ0zccaNxW\ngRwhR42hp446qibHDf936g==\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-1nguz@ecommerce-e1ce7.iam.gserviceaccount.com",
    client_id: "107246270897465015524",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1nguz%40ecommerce-e1ce7.iam.gserviceaccount.com",
  },
  PORT: process.env.PORT || 8080,
  MODE: process.env.MODE || 'fork'
};
