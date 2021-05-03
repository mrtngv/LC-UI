const PackageData = [
    {
        packageId: "1",
        telephoneNumber: "0000000001",
        processedBy: "Kristiqna Kruchmarava",
        shippedTo: "office",
        shippedFrom: "Martin G.",
        shippingDate: "07.04.2021",
        status: "awaiting pick up"
    },
    {
        packageId: "2",
        telephoneNumber: "0000000002",
        processedBy: "Krista Vasileva",
        shippedTo: "office",
        shippedFrom: "Ekaterina G.",
        shippingDate: "08.04.2021",
        status: "finished"
    },
    {
        packageId: "3",
        telephoneNumber: "0000000003",
        processedBy: "Aleksandra Jordanova",
        deliveredBy: {
            name: "Kamelia Bankova",
            telephone: "0000000002"
        },
        shippedTo: "personal address",
        shippedFrom: "Marta G.",
        shippingDate: "04.04.2021",
        status: "delivered"
    },
    {
        packageId: "4",
        telephoneNumber: "0000000004",
        processedBy: "Ico na Toni sukvartiranta",
        shippedTo: "office",
        shippedFrom: "Preslava P.",
        shippingDate: "03.04.2021",
        status: "awaiting pick up"
    },
    {
        packageId: "5",
        telephoneNumber: "0000000005",
        processedBy: "Yana Stoqnova",
        deliveredBy: {
            name: "Toni Asenov",
            telephone: "0000000006"
        },
        shippedTo: "personal address",
        shippedFrom: "Hristina N.",
        shippingDate: "08.08.2021",
        status: "in transit"
    },
]

export default PackageData;