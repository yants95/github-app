'use strict'

import React, { Component } from 'react'
import AppContent from './components/app-content';
import ajax from '@fdaciuk/ajax'

class App extends Component {
    constructor() {
        super()
        this.state = {
            userInfo: null,
            repos: [],
            starred: [],
            isFetching: false
        }
    }

    getGitHubAPIUrl = (username, type) => {
        const internalUser = username ? `/${username}` : ''
        const internalType = type ? `/${type}` : ''

        return `https://api.github.com/users${internalUser}${internalType}`
    }

    handleSearch = e => {
        const value = e.target.value
        const keyCode = e.which || e.keyCode
        const ENTER = 13

        if (keyCode === ENTER) {
            this.setState({ isFetching: true })

            ajax().get(this.getGitHubAPIUrl(value))
                .then(result => {
                    this.setState({
                        userInfo: {
                            username: result.login,
                            photo: result.avatar_url,
                            login: result.login,
                            repos: result.public_repos,
                            followers: result.followers,
                            following: result.following
                        },
                        repos: [],
                        starred: []
                    })
                })
                .always(() => this.setState({ isFetching: false }))
        }
    }

    getRepos = type => {
        return e => {
            const username = this.state.userInfo.login

            ajax().get(this.getGitHubAPIUrl(username, type))
                .then(result => {
                    this.setState({
                        [type]: result.map(repo => ({
                            name: repo.name,
                            link: repo.html_url
                        }))
                    })
                })
        }
    }

    render() {
        return <AppContent 
            {...this.state}
            handleSearch={e => this.handleSearch(e)}
            getRepos={this.getRepos('repos')}
            getStarred={this.getRepos('starred')}
        />
    }
}

export default App