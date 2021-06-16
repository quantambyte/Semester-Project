import React from 'react'

import moment from 'moment'

import { useSelector } from 'react-redux'

// ant-design components
import { Card , Avatar } from 'antd'
const { Meta } = Card


const ConnectNavBar = () => {

    const {auth} = useSelector((state) => ({...state}))
    const {user} = auth

    return (
        <div className = 'd-flex justify-content-around'>
            
            <Card>
                {/* 1st character of user's name */}
                <Meta 
                    avatar = {<Avatar>{user.name[0]}</Avatar>} 
                    title = {user.name}
                    description = {`Joined ${moment(user.createdAt).fromNow()}`}
                />
            </Card>

            {
                auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled &&
                (<>
                    <div>
                        Pending Balance
                    </div>

                    <div>
                        Payout Settings
                    </div>
                </>)}

        </div>
    )
}

export default ConnectNavBar
