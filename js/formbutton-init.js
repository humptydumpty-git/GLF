/* Formspree floating contact — load after https://formspree.io/js/formbutton-v1.min.js (same endpoint as main contact form) */
formbutton('create', {
    action: 'https://formspree.io/f/xvzwyywl',
    title: 'How can we help?',
    fields: [
        {
            type: 'email',
            label: 'Email:',
            name: 'email',
            required: true,
            placeholder: 'your@email.com'
        },
        {
            type: 'textarea',
            label: 'Message:',
            name: 'message',
            placeholder: "What's on your mind?"
        },
        { type: 'submit' }
    ],
    styles: {
        title: {
            backgroundColor: '#00C853'
        },
        button: {
            backgroundColor: '#00C853'
        }
    }
});
