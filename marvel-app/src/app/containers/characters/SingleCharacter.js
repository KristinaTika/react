import React, { Component } from 'react';
import { characterService } from '../../../services/characterService';
import { comicsService } from '../../../services/comicsService';
import { seriesService } from '../../../services/seriesService';
import { storiesService } from '../../../services/storiesService';
import './SingleCharacter.css';
import { Link } from 'react-router-dom';
import { Serie } from '../../../entities/Serie';
import { Story } from '../../../entities/Story';
import { Comic } from '../../../entities/Comic';
import Loader from '../../partials/Loader';

class SingleCharacter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            character: {},
            series: [],
            stories: [],
            comics: [],
        }

        this.renderTitles = this.renderTitles.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        characterService.fetchSingleCharacter(id)
            .then(res => (this.setState({character: res})))
            .then(res => seriesService.fetchCharacterSeries(id))
            .then(res => (this.setState({series: res})))
            .then(res => storiesService.fetchCharacterStories(id))
            .then(res => (this.setState({stories: res})))
            .then(res => comicsService.fetchCharacterComics(id))
            .then(res => (this.setState({comics: res})))
            .catch(err => console.log("Something went wrong!", err));
    }

    renderTitles(titles) {
        return titles.map((t) => {
            if(t instanceof Serie) {
                return <Link to={"/series/" + t.id} key={t.id}>{t.title}</Link>
            }
            if(t instanceof Story) {
                return <Link to={"/stories/" + t.id} key={t.id}>{t.title}</Link>
            }
            if(t instanceof Comic) {
                return <Link to={"/comics/" + t.id} key={t.id}>{t.title}</Link>
            }
        }); 
    }

    render() {
        const character = this.state.character[0];
        const { series, stories, comics } = this.state;
        return (
            <div >
                { !character ? <Loader /> : <h3> {character.name} </h3> }   
            { !character
                ?
                    ""
                :
                    <div id="single-character-container">
                        <div>
                            <img src={character.image} alt={character.name} />
                        </div>
                        <div> 
                            <h4> Description </h4>
                            <p> {character.description} </p>
                            <h4> Series: </h4>
                            <ul>
                                {
                                    !series
                                    ? <Loader />
                                    : series.length === 0 ? <Loader /> : this.renderTitles(series)
                                }
                            </ul>
                                <h4> Stories: </h4>
                            <ul>
                                {
                                    !stories
                                    ? <Loader />
                                    : stories.length === 0 ? <Loader />
                                    : this.renderTitles(stories)
                                }
                            </ul>
                            <h4> Comics: </h4>
                            <ul>
                                {
                                    !comics
                                    ? <Loader />
                                    : comics.length === 0 ? <Loader />
                                    : this.renderTitles(comics)
                                }
                            </ul>
                        </div>
                    </div>
            }
            </div>
        );
    }
}

export default SingleCharacter;