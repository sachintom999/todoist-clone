const initialState = {
    count: 0,
    addTaskFormOpen: false,
    taskDetailOpen: false,
    anyFormOpen: false,
    taskList: [],
    todaySections: [],
    loading: false,
    projects: [],
    favourites: [],
    taskDetailModalContents: {},
    labelOptions: [],
    taskDetailModalState: {
        labels: [],
        sample: [1, 2, 3],
    },
    newTaskForm: {},
}

export default initialState
