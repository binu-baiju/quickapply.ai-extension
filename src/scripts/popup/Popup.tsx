import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
// import handleAutoFill from '../content/handleAutoFill'
import { handleAutoFill } from 'e:/My Projects/react-tailwind-chrome-extension-template/src/scripts/content/handleAutoFill'
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

const Popup = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        telephone: '',
        address1: '',
        address2: '',
        address3: '',
        city: '',
        postcode: '',
        cardNumber: '',
        month: '',
        year: '',
        cvv: '',
        emailorphone: '',
        password: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // const handleAutoFill = () => {
    //     // Define keywords for identifying form fields on LinkedIn
    //     const keywords = [
    //         'name',
    //         'email',
    //         'telephone',
    //         'address1',
    //         'address2',
    //         'address3',
    //         'city',
    //         'postcode',
    //         'cardNumber',
    //         'month',
    //         'year',
    //         'cvv'
    //     ]

    //     // Find all label elements in the document
    //     const labelElements = document.querySelectorAll('label')
    //     console.log('hello')
    //     console.log('labelelements', labelElements)

    //     // Iterate over label elements
    //     labelElements.forEach(labelElement => {
    //         // Extract label text
    //         const labelText = labelElement.textContent.trim()

    //         // Check if label text matches any keyword
    //         if (keywords.includes(labelText.toLowerCase())) {
    //             // Find corresponding input field using 'for' attribute
    //             const inputId = labelElement.getAttribute('for')
    //             const inputField = document.getElementById(inputId)

    //             // If input field found, update its value from form data
    //             if (inputField) {
    //                 const keyword = labelText.toLowerCase()
    //                 ;(inputField as HTMLInputElement).value = formData[keyword]
    //             }
    //         }
    //     })

    //     // Optionally, trigger form submission if required
    //     // document.querySelector('form').submit();
    // }
    // const handleAutoFillClick = () => {
    //     console.log('hello')

    //     handleAutoFill(formData) // Call handleAutoFill with formData
    // }
    const handleAutoFillClick = () => {
        console.log('Sending message...')
        // console.log('Tab ID:', tabs[0].id);
        // console.log('Tab URL:', tabs[0].url);
        // console.log('Tab Title:', tabs[0].title);
        // chrome.runtime.sendMessage({ action: 'autofill' })
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'autofill' })
        })
        console.log('sent message')
    }

    return (
        // <div className="inline-flex flex-col justify-start items-start border shadow w-[212px] h-44 bg-white rounded-xl ">
        <div className="inline-flex flex-col justify-start items-start w-[212px] h-48 bg-white  ">
            <div className="inline-flex flex-col items-center justify-center gap-4 bg-white w-full h-3/4">
                <Button className="bg-black text-white rounded-[6px] w-3/4 hover:bg-black">
                    Fill The Form
                </Button>
                <Button className="bg-[#1abc9c] hover:bg-[#27a98fb2] rounded-[14px] w-3/4">
                    Prefill your info
                </Button>
                <div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="password"
                    />
                    <input
                        type="email"
                        name="emailorphone"
                        value={formData.emailorphone}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <button onClick={handleAutoFillClick}>Auto Fill</button>
                </div>
            </div>
        </div>
    )
}

export default Popup
