"use client"

import React, { useState } from 'react'


function Test() {
    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("")

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setName(e.target.value)

    }

    function handleMessageChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setMessage(e.target.value)
    }

    async function handleSubmit() {
        try {
            const res = await fetch("/api/send-email", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        name,
                        message,
                        to: "samuelnanbam@gmail.com"
                    }),
            })

            if (!res.ok) {
                throw new Error("Failed to send message!")
            }
            
            console.log("form data",name,message)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="flex flex-col">
            <label htmlFor="">
                Name:
                <input className="border-2 border-amber-500" type="text" value={name} name="name" onChange={handleNameChange} />
            </label>

            <label htmlFor="">
                Message:
                <textarea className="border-2 border-amber-500" name="message" id="message" value={message} onChange={handleMessageChange}></textarea>
            </label>

            <button type="button" onClick={handleSubmit}>Send Message</button>
        </form>
    )
}

export default Test