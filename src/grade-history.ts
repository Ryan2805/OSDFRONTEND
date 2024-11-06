export interface GradeHistory {
    _id?: string;
    student id: number ; 
    class id: number; 
    scores: Score[];

}

interface Score {
    type: 'exam' | 'quiz' | 'homework';
    score: number; 
}
