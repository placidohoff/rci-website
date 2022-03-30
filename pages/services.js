import { useState, useEffect } from "react"
import { SERVICES, OPTIONS } from "../data/SERVICES"
import styles from '../styles/Services.module.css'
import Image from "next/image"
import Head from 'next/head'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import RequestModal from "../components/RequestModal"

let timer
export default function Services() {
    
    useEffect(() => {
        if (isMovingHighlight) {
            timer = setInterval(() => {
                handleHighlights()
            }, 2500)
        }
        else {
            clearInterval(timer)
            return
        }

    }, [])
    const [loadedService, setLoadedService] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMovingHighlight, setIsMovingHighlight] = useState(true)

    const handleImageClick = (num) => {
        clearInterval(timer)
        setLoadedService(num);
        setIsMovingHighlight(false);
        
    }

    const handleHighlights = () => {
        if (isMovingHighlight) {
            if (loadedService < 5) {
                setLoadedService(loadedService+=1)


            } else  {
                setLoadedService(0)
            }
        }
    }

    const ShowImages = () => {

        return (
            <div className={styles.showImages}>
                {
                    SERVICES.map((service, index) => (
                        <div className='grid-items' key={Math.random()}>
                            <div className={loadedService === index ? 'active' : 'regular'}>
                                <Image src={service.image} alt={service.service} onClick={() => handleImageClick(index)} />
                            </div>
                        </div>
                    ))
                }
                <style jsx>{`
                    .active{
                        border: 4px solid yellow;
                        margin-bottom: 5px;
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                        padding: 5px;
                    }

                    .regular{
                        margin-bottom: 5px;
                        cursor: pointer;
                        padding: 5px;
                    }
                
                `}
                </style>
            </div>
        )
    }

    const ShowDescription = () => {
        return (
            <div className={styles.descriptionContainer}>
                <p className={styles.title}>{SERVICES[loadedService].service}</p>
                {/* <p className={styles.description}>{SERVICES[loadedService].description}</p> */}
                <p className={styles.minDescription}>{SERVICES[loadedService].minDescription}KHKHKHK</p>
                <p
                    className={styles.mainButton}
                    onClick={() => setIsModalOpen(true)}
                >
                    Request Service</p>
            </div>
        )
    }

    const ShowCarousel = () => {
        return (
            <div className="carousel-wrapper">
                <Carousel infiniteLoop autoPlay>
                    <div>
                        <div className={styles.carouselImage}><Image src={SERVICES[0].image} /></div>
                        <div className={styles.descriptionContainer}>
                            <p className={styles.title}>{SERVICES[0].service}</p>
                            {/* <p className={styles.description}>{SERVICES[0].description}</p> */}
                            <p className={styles.description}>{SERVICES[0].minDescription}</p>
                            <p className={styles.mainButton} onClick={() => setIsModalOpen(true)}>Request Service</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.carouselImage}><Image src={SERVICES[1].image} /></div>
                        <div className={styles.descriptionContainer}>
                            <p className={styles.title}>{SERVICES[1].service}</p>
                            <p className={styles.description}>{SERVICES[1].description}</p>
                            <p className={styles.mainButton} onClick={() => setIsModalOpen(true)}>Request Service</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.carouselImage}><Image src={SERVICES[2].image} /></div>
                        <div className={styles.descriptionContainer}>
                            <p className={styles.title}>{SERVICES[2].service}</p>
                            <p className={styles.description}>{SERVICES[2].description}</p>
                            <p className={styles.mainButton} onClick={() => setIsModalOpen(true)}>Request Service</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.carouselImage}><Image src={SERVICES[3].image} /></div>
                        <div className={styles.descriptionContainer}>
                            <p className={styles.title}>{SERVICES[3].service}</p>
                            <p className={styles.description}>{SERVICES[3].description}</p>
                            <p className={styles.mainButton} onClick={() => setIsModalOpen(true)}>Request Service</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.carouselImage}><Image src={SERVICES[4].image} /></div>
                        <div className={styles.descriptionContainer}>
                            <p className={styles.title}>{SERVICES[4].service}</p>
                            <p className={styles.description}>{SERVICES[4].description}</p>
                            <p className={styles.mainButton} onClick={() => setIsModalOpen(true)}>Request Service</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.carouselImage}><Image src={SERVICES[5].image} /></div>
                        <div className={styles.descriptionContainer}>
                            <p className={styles.title}>{SERVICES[5].service}</p>
                            <p className={styles.description}>{SERVICES[5].description}</p>
                            <p className={styles.mainButton} onClick={() => setIsModalOpen(true)}>Request Service</p>
                        </div>
                    </div>

                </Carousel>
            </div>
        )
    }

    return (
        <div className={styles.services}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet" />
            </Head>


            <div className={styles.sideA}>
                <div className={styles.header}><p>Services We Offer</p></div>
                <div className={styles.imageList}><ShowImages /></div>
                <div className={styles.imageCarousel}><ShowCarousel /></div>
            </div>
            <div className={styles.sideB}>
                <ShowDescription />
            </div>


            <div>
                <RequestModal
                    isOpen={isModalOpen}
                    closeModalFn={() => setIsModalOpen(false)}
                    options={OPTIONS}
                    val={loadedService}
                />
            </div>

        </div>
    )
}