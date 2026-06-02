import Ajv from "ajv";

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        LedgerName: {
            type: "string"
        }
    },
    required: ["LedgerName"],
    additionalProperties: true
};

const validate = ajv.compile(schema);

const ValidateRequestFunc = ({ inRequestBody }) => {
    const localValid = validate(inRequestBody);

    if (!localValid) {
        return {
            KTF: false,
            KReason: validate.errors
        };
    }

    return {
        KTF: true,
        KReason: "Validated"
    };
};

export default ValidateRequestFunc;