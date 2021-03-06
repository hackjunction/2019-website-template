import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from '../Image';
import './style.scss';

import * as ContentSelectors from '../../redux/dynamiccontent/selectors';

const FooterImageButtons = props => {
    const renderButtons = images => {
        return images.map(image => {
            return (
                <div className="ImageButtons--button" key={image._id}>
                    <Image
                        className="ImageButtons--button__image"
                        image={image.image}
                        width={600}
                        height={200}
                        crop={'fill'}
                        alt={image.text}
                    />
                    <Link
                        className="ImageButtons--button__link"
                        to={image.link}
                    >
                        <span className="ImageButtons--button__link-text">
                            {image.text}
                        </span>
                    </Link>
                </div>
            );
        });
    };
    return (
        <div className="ImageButtons">{renderButtons(props.imageButtons)}</div>
    );
};

const mapStateToProps = state => ({
    imageButtons: ContentSelectors.footerImages(state)
});

export default connect(mapStateToProps)(FooterImageButtons);

