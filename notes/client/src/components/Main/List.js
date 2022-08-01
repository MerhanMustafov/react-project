
function List(props){
    console.log(props.listName)
    
    return (
        <div className="listWrapper">
            <header>
                <div className="title">{props.listName}</div>
            </header>
            <main></main>
            <footer><button className="add">Add Note</button></footer>
        </div>
    );
}


export {List}
