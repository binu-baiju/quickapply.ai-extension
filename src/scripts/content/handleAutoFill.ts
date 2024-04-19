interface FormData {
    name: string
    email: string
    telephone: string
    address1: string
    address2: string
    address3: string
    city: string
    postcode: string
    cardNumber: string
    month: string
    year: string
    cvv: string
    emailorphone: string
    password: string
}
export const handleAutoFill = (formData: FormData) => {
    // Define keywords for identifying form fields on LinkedIn
    const keywords = [
        'name',
        'email',
        'telephone',
        'address1',
        'address2',
        'address3',
        'city',
        'postcode',
        'cardNumber',
        'month',
        'year',
        'cvv',
        'emailorphone',
        'password'
    ]

    // Find all label elements in the document
    const labelElements = document.querySelectorAll('label')
    console.log('hello')
    console.log('labelelements', labelElements)
    console.log('hoi')

    // Iterate over label elements
    labelElements.forEach(labelElement => {
        // Extract label text
        const labelText = labelElement.textContent.trim().replace(/\s/g, '').toLowerCase()
        console.log('label text')
        console.log('labeltext:', labelText)

        // Check if label text matches any keyword
        if (keywords.includes(labelText.toLowerCase())) {
            // Find corresponding input field using 'for' attribute
            const inputId = labelElement.getAttribute('for')
            const inputField = document.getElementById(inputId)
            console.log('input field')
            console.log('inputfield:', inputField)
            // If input field found, update its value from form data
            if (inputField) {
                const keyword = labelText.toLowerCase()
                console.log('formData[keyword]', formData[keyword])
                ;(inputField as HTMLInputElement).value = formData[keyword]
            }
        }
    })

    // Optionally, trigger form submission if required
    // document.querySelector('form').submit();
}
