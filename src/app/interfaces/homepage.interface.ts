export interface Carousel {
    _id: string,
    title: string,
    subtitle: string,
    actionText: string,
    actionLink: string
}
export interface Homepage {
    adv: {
        text: string,
        url: string
    },
    carousels: Carousel[],
    change: {
        title: string,
        subtitle: string,
        content: string
    },
    salary: {
        title: string,
        subtitle: string,
        actionText: string,
        actionLink: string,
        details: [
            {
                _id: string,
                title: string,
                subtitle: string,
                content: string
            }            
        ]        
    },
    experience: {
        title: string,
        subtitle: string,
        actionText: string,
        actionLink: string
    },
    best: {
        title: string,
        subtitle: string,
        actionText: string,
        actionLink: string        
    }
}
