import mongoose, { Document, Model } from "mongoose";

interface reportType extends Document{
    jobDesc: string,
    resumeText: string,
    selfDesc: string,
    
    technicalQuestions: [ object ],
    behavioralQuestions: [ object ],
    skillGaps: [ object ],
    preparationPlan: [ object ],
    matchScore: number,
    user: any
}

interface technicalQuestionsType extends Document{
    question: string, 
    intention: string,
    answer: string
}

interface behavioralQuestionsType extends Document{
    question: string, 
    intention: string,
    answer: string
}

interface skillGapsType extends Document{
    skill: string,
    severity: Enumerator,
}

interface preparationPlanType extends Document{
    day: number,
    focus: string,
    tasks: [string]
}

const technicalQuestionsSchema = new mongoose.Schema<technicalQuestionsType>({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: String,
    answer: String
},{
    _id: false
})

const behavioralQuestionsSchema = new mongoose.Schema<behavioralQuestionsType>({
    question: {
        type: String,
        required: [true, "Behaviourial question is required"]
    },
    intention: String,
    answer: String
},{
    _id: false
})

const skillGapsSchema = new mongoose.Schema<skillGapsType>({
    skill: String,
    severity: {
        type: String,
        enum: ["low", "medium", "high"]
    }
},{
    _id: false
})

const preparationPlanSchema = new mongoose.Schema<preparationPlanType>({
    day: Number,
    focus: String,
    tasks: [String]
},{
    _id: false
})

const reportSchema = new mongoose.Schema<reportType>({
    jobDesc : {
        type: String,
        required: [true, "Job description is required"]
    },
    resumeText: String,
    selfDesc: String,

    matchScore: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "Match Score is required"]
    },
    technicalQuestions: [ technicalQuestionsSchema ],
    behavioralQuestions: [ behavioralQuestionsSchema ],
    skillGaps: [ skillGapsSchema ],
    preparationPlan: [ preparationPlanSchema ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

},{
    timestamps: true
})

export const reportModel: Model<reportType> = mongoose.model<reportType>("report", reportSchema); 