const ProfileDetails=({label,value})=>{
    return(
        <div className="w-full grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">{label}</div>
            <div className="px-4 py-2 text-[0.95rem]">{value}</div>
        </div>
    )
}

export default ProfileDetails;