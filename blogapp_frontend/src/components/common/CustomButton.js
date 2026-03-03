



function CustomButton ({title,bg_color}){
    return(
        <div className={`${bg_color} rounded-md px-3 py-2`}>
           {title}
        </div>
    )
}

export default CustomButton;