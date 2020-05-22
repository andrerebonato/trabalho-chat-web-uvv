export class RootController {
    static handleSuccessResponse(message, data) {
        return new {
            success: true,
            message,
            data
        }
    }
}
