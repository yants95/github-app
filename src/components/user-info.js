'use strict'

import React, { PropTypes } from 'react'

const UserInfo = ({ userInfo }) => (
    <div className='user-info'>
        <img src={userInfo.photo} />
        <h1>
            <a href={`https://github.com/${userInfo.login}`}>{userInfo.username}</a>
        </h1>

        <ul className='repos-info'>
            <li>Repositórios: {userInfo.repos}</li>
            <li>Seguidores: {userInfo.followers}</li>
            <li>Seguindo: {userInfo.following}</li>
        </ul>
    </div>
)

UserInfo.propTypes = {
    userInfo: PropTypes.shape({
        username: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        repos: PropTypes.number.isRequired,
        followers: PropTypes.number.isRequired,
        following: PropTypes.number.isRequired
    })
}

export default UserInfo