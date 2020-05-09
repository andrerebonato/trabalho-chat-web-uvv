import Alert from 'react-s-alert';


export const typesAlert = {
    warning: "warning",
    success: "success",
    error: "error"
}

export const displayAlert = (message, type) => {

    if (type === typesAlert.warning) {
        Alert.warning(message, {
            position: 'top-right',
            effect: 'slide'
        });
    }

    if (type === typesAlert.success) {
        Alert.success(message, {
            position: 'top-right',
            effect: 'slide'
        });
    }

    if (type === typesAlert.error) {
        Alert.error(message, {
            position: 'top-right',
            effect: 'slide'
        });
    }

}   