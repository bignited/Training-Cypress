import { Types } from "../fixtures/course";

export const createCourse = {
    input: {
        name: '#input-course-name',
        description: '#textarea-description',
        teacher: '#input-teacher',
        date: '#input-date',
        startTime: '#input-time-start',
        endTime: '#input-time-end',
        phone: '#input-contact-phone',
        email: '#input-contact-email'
    },
    select: {
        location: '#select-location'
    },
    radio: {
        type: (type: Types) => `#radio-course-${type}` 
    },
    button: {
        uploadImage: '#image-upload',
        addCourse: '#button-add-course'
    },
    message: {
    }
}