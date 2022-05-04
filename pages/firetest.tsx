import type { NextPage } from "next";
import Head from "next/head";
import styles from '../styles/Fire.module.css'
import { firestore } from '../firebase/clientApp'
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { updateDoc } from 'firebase/firestore';
import { doc } from '@firebase/firestore'; // for creating a pointer to our Document





const Home: NextPage = () => {
    const todosCollection = collection(firestore, 'todos')

    const [todos, setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const getTodos = async () => {
        //constuct a query to get up to 10 undone todos:
        const todosQuery = query(todosCollection, where('done', '==', false), limit(10))

        //run the query/get the todos:
        const querySnapshot = await getDocs(todosQuery)

        //Array to save the mapped data
        const result: QueryDocumentSnapshot<DocumentData>[] = []

        //map through todos adding them to the results
        querySnapshot.forEach((snapshot) => {
            result.push(snapshot)
        });

        //set it to state
        setTodos(result)
    }

    const updateTodo = async (documentId: string) => {
        const _todo = doc(firestore, `todos/${documentId}`)

        try {
            await updateDoc(_todo, {
                "done": true
            })
            //retrieve todos:
            getTodos()
        }catch{
            console.log('error')
            console.log(documentId)
        }
    }

    //Load the data, after done, set loading to false. (Data pull exaggeration)
    useEffect(() => {
        getTodos()

        //unset loading
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Todos App</title>
                <meta name="description" content="Next JS Example" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Todos App</h1>
                <div className={styles.grid}>
                    {
                        loading ? (
                            <div className={styles.card}>
                                <h2>Loading</h2>
                            </div>
                        ) :
                            todos.length === 0 ? (
                                <div className={styles.card}>
                                    <h2>No undone todo-items</h2>
                                    <p>Consider adding a todo from <a href="/add-todo">here</a></p>
                                </div>
                            ) : (
                                todos.map((todo) => {
                                    return (
                                        <div className={styles.card}>
                                            <h2>{todo.data().title}</h2>
                                            <p>{todo.data().description}</p>
                                            <div className={styles.cardActions}>
                                                <button type="button" onClick={e => updateTodo(todo.id)}>Mark as done</button>
                                                <button type="button">Delete</button>
                                            </div>
                                            {console.log('TEST ', todo.id)}
                                        </div>
                                    )
                                })
                            )
                    }

                </div>
            </main>
            <footer className={styles.footer}>
                <a href="#" rel="noopener noreferrer">
                    Todos app
                </a>

            </footer>
        </div>
    )
}

export default Home