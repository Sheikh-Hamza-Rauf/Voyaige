import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-image">
                <h1 className="hero-title">Islamabad, Pakistan</h1>
             
            </div>
            <div className="hero-description">
                <p>
                    Serving as the capital of Pakistan since the Sixties, Islamabad was built according to a
                    carefully organized plan, divided into sectors along a grid of clean, tree-lined streets.
                    The city is sheltered by the Margalla Hills, the foothills of the Himalayas and the home of
                    rare species of leopard, deer, birds, and even porcupines. Several hiking paths end at
                    Daman-e-Koh, a picnic spot with a splendid view of the entire city, including the massive
                    modernist Faisal Mosque and even the Rawal Dam.
                </p>
            </div>
        </section>
    );
};

export default Hero;