import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { apicall } from "../../../utils/services";

const Todo = () => {
    const [newpendingTodo, setNewpendingTodo] = useState('')
    const [newcompletedTodo, setNewcompletedTodo] = useState('')
    const [addPending, setAddPending] = useState(false)
    const [addCompleated, setAddCompleated] = useState(false)
    const [pendingTodo, setPendingTodo] = useState([])
    const [completedTodo, setCompletedTodo] = useState([])
    const { userData } = useSelector(state => state.user)

    useEffect(() => {
        getTodo()
    }, [])
    const getTodo = () => {
        apicall("get", "todos", '', { userId: userData.id }, (data) => {
            let data1 = data.filter((d) => {
                return !d.isDone
            })
            let data2 = data.filter((d) => {
                return d.isDone
            })
            setPendingTodo(data1)
            setCompletedTodo(data2)
        })
    }
    const addPendingTodo = () => {
        if (!userData.permissions.includes("create")) {
            toast.error('Permission Denied');
        }
        else if (newpendingTodo == '') {
            toast.error('Please enter a todo!');
        } else {
            let data = {
                "userId": userData.id,
                "task": newpendingTodo,
                "isDone": false
            }
            apicall("post", "todos", data, '', (data) => {
                toast.success('Todo added successfully');
                getTodo()
                setNewpendingTodo('')
                setAddPending(false)
            })
        }

    }
    const addCompletedTodo = () => {
        if (!userData.permissions.includes("create")) {
            toast.error('Permission Denied');
        }
        else if (newcompletedTodo == '') {
            toast.error('Please enter a todo!');
        } else {
            let data = {
                "userId": userData.id,
                "task": newcompletedTodo,
                "isDone": true
            }
            apicall("post", "todos", data, '', (data) => {
                toast.success('Todo added successfully');
                getTodo()
                setNewcompletedTodo('')
                setAddCompleated(false)
            })
        }

    }
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        if (result.destination.droppableId == result.source.droppableId && result.destination.index != result.source.index) {
            if (result.destination.droppableId == "pending") {
                let items = Array.from(pendingTodo);
                let [reorderedTodo] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedTodo);
                setPendingTodo(items);
            } else {
                let items = Array.from(completedTodo);
                let [reorderedTodo] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedTodo);
                setCompletedTodo(items);
            }
        }
        if (result.destination.droppableId != result.source.droppableId) {
            if (result.destination.droppableId == "pending") {
                if (!userData.permissions.includes("update")) {
                    toast.error('Permission Denied');
                } else {
                    apicall("patch", `todos/${result.draggableId}`, { "isDone": false }, '', (data) => {
                        console.log("update", data)
                    })
                    let [reorderedTodo] = completedTodo.splice(result.source.index, 1);
                    pendingTodo.splice(result.destination.index, 0, reorderedTodo);
                }

            } else if (result.destination.droppableId == "completed") {
                if (!userData.permissions.includes("update")) {
                    toast.error('Permission Denied');
                } else {
                    apicall("patch", `todos/${result.draggableId}`, { "isDone": true }, '', (data) => {
                        console.log("update", data)
                    })
                    let [reorderedTodo] = pendingTodo.splice(result.source.index, 1);
                    completedTodo.splice(result.destination.index, 0, reorderedTodo);
                }
            } else if (result.destination.droppableId == "delete") {
                if (!userData.permissions.includes("delete")) {
                    toast.error('Permission Denied');
                } else {
                    apicall("delete", `todos/${result.draggableId}`, '', '', (data) => {
                        console.log("update", data)
                        toast.success('Todo removed successfully');
                        getTodo()
                    })
                }
            }
        }

    }

    return (
        <>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="flex w-full flex-col justify-center items-center">
                    <div className="flex flex-wrap gap-8">
                        <Droppable droppableId="pending">
                            {(provided) => (
                                <div className="pending mt-8 p-4  bg-gradient-to-r from-blue-50 to-white border shadow  rounded-2xl" {...provided.droppableProps} ref={provided.innerRef}>
                                    <h1 className="text-2xl text-left px-4 font-bold text-slate-900">Pending Todo</h1>
                                    <div className="flex flex-col w-60">
                                        {pendingTodo.map((d, index) => {
                                            return (
                                                <Draggable key={d.id} draggableId={d.id} index={index}>
                                                    {(provided) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task text-3xl flex justify-between bg-yellow-50 m-2 p-2 shadow rounded-md border-yellow-500 border">
                                                            <div className="items-center">
                                                                <p name="task" className="bg-transparent  w-full text-xl" >{d.task}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        })}
                                    </div>
                                    {provided.placeholder}
                                    {!addPending ?
                                        <p className="pl-4 font-bold text-slate-600 hover:text-slate-800 cursor-pointer" onClick={() => setAddPending(true)}>Add Card +</p>
                                        :
                                        <form >
                                            <div className="task text-xl w-56 flex justify-between bg-blue-50 m-2 p-2 shadow rounded-md border-slate-400 border">
                                                <div className="items-center">
                                                    <textarea className="w-full bg-transparent focus:outline-none" value={newpendingTodo} onChange={(event) => setNewpendingTodo(event.target.value)} />
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-end pr-4 w-full">
                                                <button type="button" className="bg-slate-900 hover:bg-slate-700 text-white px-2 py-1 rounded-lg" onClick={() => setAddPending(false)}>Close</button>
                                                <button onClick={addPendingTodo} type="button" className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-lg">Add +</button>
                                            </div>

                                        </form>
                                    }
                                </div>

                            )}
                        </Droppable>
                        <Droppable droppableId="completed">
                            {(provided) => (
                                <div className="completed mt-8 px-4 py-4 bg-gradient-to-r from-blue-50 to-white border shadow  rounded-2xl" {...provided.droppableProps} ref={provided.innerRef}>
                                    <h1 className="text-2xl  text-left px-4 font-bold text-slate-900">Completed Todo</h1>
                                    <div className="flex flex-col w-60">
                                        {completedTodo.map((d, index) => {
                                            return (
                                                <Draggable key={d.id} draggableId={d.id} index={index}>
                                                    {(provided) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task text-3xl flex justify-between bg-green-100 m-2 p-2 shadow rounded-md border-green-500 border">
                                                            <div className="items-center">
                                                                <p name="task" className="bg-transparent  w-full text-xl" >{d.task}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>

                                            )
                                        })}
                                    </div>
                                    {provided.placeholder}
                                    {!addCompleated ?
                                        <p className="pl-4 font-bold text-slate-600 hover:text-slate-800 cursor-pointer" onClick={() => setAddCompleated(true)}>Add Card +</p>
                                        :
                                        <form >
                                            <div className="task text-xl w-56 flex justify-between bg-blue-50 m-2 p-2 shadow rounded-md border-slate-400 border">
                                                <div className="items-center">
                                                    <textarea className="w-full bg-transparent focus:outline-none" value={newcompletedTodo} onChange={(event) => setNewcompletedTodo(event.target.value)} />
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-end pr-4 w-full">
                                                <button className="bg-slate-900 hover:bg-slate-700 text-white px-2 py-1 rounded-lg" type="button" onClick={() => setAddCompleated(false)}>Close</button>
                                                <button type="button" onClick={addCompletedTodo} className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-lg">Add +</button>
                                            </div>

                                        </form>
                                    }
                                </div>

                            )}
                        </Droppable>
                        <Droppable droppableId="delete">
                            {(provided) => (
                                <div className="completed mt-8 px-4 py-4 h-80  bg-gradient-to-r from-blue-50 to-white border shadow  rounded-2xl" {...provided.droppableProps} ref={provided.innerRef}>
                                    <h1 className="text-2xl  text-left px-4 font-bold text-slate-900">Delete Todo</h1>
                                    <div className=" bg-gradient-to-r from-red-50 to-red-200 shadow  border border-red-600 h-60 mx-4 mt-2  w-60 rounded-lg flex justify-center items-center">
                                        <img src="https://cdn.iconscout.com/icon/free/png-256/free-delete-icon-download-in-svg-png-gif-file-formats--saas-icons-pack-miscellaneous-902124.png?f=webp&w=256" className="w-12" />

                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div >
            </DragDropContext >
        </>
    )
}

export default Todo