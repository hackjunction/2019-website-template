import React from 'react';
import './style.scss';

import { motion } from 'framer-motion';

import Markdown from '../Markdown';

const fadeIn = {
    initial: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.3
        }
    }
};

const slideUp = {
    initial: {
        opacity: 0,
        y: 10
    },
    visible: {
        opacity: 1,
        y: 0
    }
};

const BasicHeader = ({ title, body, children, center = false }) => {
    return (
        <motion.div variants={fadeIn} className="BasicHeader">
            <motion.h2
                variants={slideUp}
                className={
                    center ? 'BasicHeader--title__center' : 'BasicHeader--title'
                }
            >
                {title}
            </motion.h2>
            <motion.div
                variants={slideUp}
                className={
                    center ? 'BasicHeader--body__center' : 'BasicHeader--body'
                }
            >
                <Markdown
                    source={body}
                    className={center ? 'BasicHeader--body-content' : ''}
                />
                {children}
            </motion.div>
        </motion.div>
    );
};

export default BasicHeader;
