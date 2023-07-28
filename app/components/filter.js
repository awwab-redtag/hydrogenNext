'use client'

export default function Filter({data,filter,setFilter}){
    function handleFilter(event){
        if(event.target.checked){
            setFilter((filter) ? filter.concat([event.target.value]):[event.target.value])
        }else{
            setFilter(filter.filter(filter => filter!=event.target.value))
        }
    }
    return(
        <div>
            <h4 className="text-3xl font-bold mb-4">Filter</h4>
            <ul>
                {data.filter.options.map((filter) => {
                    return(
                        <li key={filter.filterOptionId} className="mb-5">
                            {('values' in filter) &&
                            <>
                                <h5 className="font-bold mb-2 text-xl">{filter.label}</h5>
                                <ul>
                                    {filter.values.map((value) => {
                                        return(
                                            <li key={filter.filterOptionId+value.key}>
                                                <label>
                                                    <input type="checkbox" value={filter.filterOptionId+'='+value.key} onChange={(event) => handleFilter(event)}/>
                                                    <span className="ms-3">{value.key}<span className="ms-4">({value.doc_count})</span></span>
                                                </label>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                            }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}