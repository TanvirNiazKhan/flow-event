const EventDetails = () => {
    return (
        <div className="w-full">
            <div className="w-9/12 m-auto">
                <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="h-60 w-full"></img>
                <p className="text-2xl flex font-bold">How Non-Techies Can Launch Successful Tech Startups
                </p>
            </div>
            <div className="w-9/12 m-auto flex">
                <div className="w-9/12">
                    <p className="text-lg font-bold flex mt-8">Details:</p>
                    <p></p>
                </div>
                <div className="w-3/12 flex rounded-md">
                    <div className="bg-gray-100 h-16 w-56 flex rounded-md box-shadow-100">
                        <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-12 h-16 mb-auto"></img>
                        <div className="flex-col">
                            <p className="px-4">Dhaka Club</p>
                            <p className="px-4">Public</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default EventDetails;