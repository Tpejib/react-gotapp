import React from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage'
import CharacterPage from '../characterPage'


export default class App extends React.Component {
    state = {
        randomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                randomChar: !state.randomChar
            }
        })
    }

    render() {
        const randomChar = this.state.randomChar ? <RandomChar/> : null

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomChar}
                            <Button color='primary' className='' onClick={this.toggleRandomChar}>Toggle Random Char</Button>
                        </Col>
                    </Row>
                    
                </Container>
                <CharacterPage/>
            </>
        );
    }
};
