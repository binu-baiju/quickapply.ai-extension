import React, { useEffect, useState } from 'react'
import { handleAutoFill } from './handleAutoFill'
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
// export const handleAutoFill = (formData: FormData) => {
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
//         'cvv',
//         'emailorphone',
//         'password'
//     ]

//     // Find all label elements in the document
//     const labelElements = document.querySelectorAll('label')
//     console.log('hello')
//     console.log('labelelements', labelElements)
//     console.log('hoi')

//     // Iterate over label elements
//     labelElements.forEach(labelElement => {
//         // Extract label text
//         const labelText = labelElement.textContent.trim().replace(/\s/g, '').toLowerCase()
//         console.log('label text')
//         console.log('labeltext:', labelText)

//         // Check if label text matches any keyword
//         if (keywords.includes(labelText.toLowerCase())) {
//             // Find corresponding input field using 'for' attribute
//             const inputId = labelElement.getAttribute('for')
//             const inputField = document.getElementById(inputId)
//             console.log('input field')
//             console.log('inputfield:', inputField)
//             // If input field found, update its value from form data
//             if (inputField) {
//                 const keyword = labelText.toLowerCase()
//                 console.log('formData[keyword]', formData[keyword])
//                 ;(inputField as HTMLInputElement).value = formData[keyword]
//             }
//         }
//     })

//     // Optionally, trigger form submission if required
//     // document.querySelector('form').submit();
// }
const App = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
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

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }
    const handleInputChange = e => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const messageListener = (request, sender, sendResponse) => {
        console.log('Gimme: Message Received', request, sender, sendResponse)
        if (request.action === 'autofill') {
            handleAutoFill(formData)
            return true
        }
    }

    chrome.runtime.onMessage.addListener(messageListener)
    // useEffect(() => {
    //     console.log('Gimme: App.tsx')
    //     setIsOpen(true)
    //     chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //         console.log('Gimme: Message Received', request, sender, sendResponse)
    //         if (request.action === 'autofill') {
    //             handleAutoFill(formData)
    //         }
    //     })
    // }, [formData])
    useEffect(() => {
        console.log('Gimme: App.tsx')
        setIsOpen(true)
        const messageListener = (request, sender, sendResponse) => {
            console.log('Gimme: Message Received', request, sender, sendResponse)
            if (request.action === 'autofill') {
                handleAutoFill(formData)
                return true
            }
        }

        chrome.runtime.onMessage.addListener(messageListener)

        // Clean up the listener when the component unmounts
        return () => {
            chrome.runtime.onMessage.removeListener(messageListener)
        }
    }, [formData]) // Add formData as a dependency

    return (
        <>
            {isOpen && (
                <div className="fixed bottom-0 right-0 p-4">
                    <div className="inline-flex items-center justify-center h-16 rounded-full">
                        <div className="inline-flex items-center justify-end p-2 rounded-full bg-gradient-to-r from-fuchsia-700 to-blue-400">
                            <div className="inline-flex flex-col self-stretch justify-center gap-2 px-4">
                                <div className="font-normal leading-tight tracking-wider text-white text-normal">
                                    Hey, this is an overlay from the Content script, built with
                                    React and Tailwind. Happy Building!
                                </div>
                            </div>
                            <div className="inline-flex items-start self-stretch justify-start p-4 px-8 duration-200 bg-white rounded-full cursor-pointer hover:bg-gothamBlack-50">
                                <div
                                    className="text-base font-bold text-center text-black"
                                    onClick={toggleIsOpen}
                                >
                                    Close
                                </div>
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
                                    <button onClick={() => handleAutoFill(formData)}>
                                        Auto Fill
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default App
