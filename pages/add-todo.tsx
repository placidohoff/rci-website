import type { NextPage } from 'next'
import Head from "next/head";
import { useState } from 'react';
import styles from '../styles/Fire.module.css'
import { doc } from '@firebase/firestore'; // for creating a pointer to our Document
import { setDoc } from 'firebase/firestore'; // for adding the Document to Collection
import { firestore } from '../firebase/clientApp'; // firestore instance


const AddTodo: NextPage = () => {
    const [title, setTitle] = useState<string>(""); // title
    const [description, setDescription] = useState<string>("");// description
    const [error, setError] = useState<string>("");// error
    const [message, setMessage] = useState<string>("");// message

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // avoid default behaviour

        if (!title || !description) { // check for any null value
            return setError("All fields are required");
        }else{
            addTodo()
        }
    }

    const addTodo = async () => {
        const timestamp: string = Date.now().toString()
        
        const _todo = doc(firestore, `todos/${timestamp}`)

        const todoData = {
            title,
            description,
            done: false
        }
        try{
            //add the Document
            await setDoc(_todo, todoData)
            //show a success message
            setMessage("Todo added successfully")
            //reset fields
            setTitle('')
            setDescription('')
        } catch(error){
            setError("An error occured while adding to the todo list")
        }

    }

    

     

    return (
        <div className={styles.container}>
            <Head>
                <title>Add todo</title>
                <meta name="description" content="Next.js firebase todos app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.main}>
                <h1 className={styles.title}>Add Todo</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {
                        error && (
                            <div className={styles.formGroup}>
                                <p className={styles.error}>{error}</p>
                            </div>
                        )
                    }
                    {
                        message && (
                            <div className={styles.formGroup}>
                                <p className={styles.success}>
                                    {message}. Proceed to <a href='/'>Home</a>
                                </p>
                            </div>
                        )
                    }
                    <div className={styles.formGroup}>
                        <label>Title</label>
                        <input type="text"
                            placeholder="Todo title"
                            onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea
                            placeholder="Todo description"
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <button type="submit">Submit</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddTodo