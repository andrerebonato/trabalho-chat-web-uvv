class HandleResponse {

    static success(message, data) {
        return {
            success: true,
            message: message,
            data: data
        }
    }

    static logicalError(message, data) {
        return {
            success: false,
            message: message,
            data: data
        }
    }

    static listSuccess(message, data) {
        return {
            success: true,
            message: message,
            data: data,
            total: data.length
        }
    }

    static internalError(message, data) {
        return {
            success: false,
            message: message,
            data: data
        }
    }

}

module.exports = HandleResponse;