class node {
    constructor(data) {
        this.data = data;
        this.next = null
        this.prev = null
    }
}


class linkList {
    constructor() {
        this.head = null
        this.current = null
    }

    insert(data) {
        let newNode = new node(data)
        if (this.head === null) {
            this.head = newNode
            this.current = newNode
        } else {
            let temp = this.head
            while (temp.next !== null) {
                temp = temp.next
            }
            temp.next = newNode
            newNode.prev = temp
            this.current = newNode
        }
    }

    prevEdit() {
        const prevData = this.current.prev
        if (prevData) {
            this.current = prevData
            return prevData.data
        }
    }
    nextEdit() {
        const nextData = this.current.next
        if (nextData) {
            this.current = nextData
            return nextData.data
        } else {
            return null
        }
    }
}


const storeData = new linkList()

export default storeData
