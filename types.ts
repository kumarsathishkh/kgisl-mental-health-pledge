
export interface PledgeFormData {
  fullName: string;
  email: string;
  college: string;
  department: string;
  rollNumber: string;
  yearOfStudy: string;
  gender: string;
}

export enum YearOfStudy {
  FIRST = "1st Year",
  SECOND = "2nd Year",
  THIRD = "3rd Year",
  FOURTH = "4th Year",
  FIFTH = "5th Year (Medical/Nursing)"
}

export const KG_INSTITUTIONS = {
  "KGiSL Institute of Technology (KiTE)": [
    "B.E. Computer Science and Engineering",
    "B.Tech Information Technology",
    "B.E. Electronics and Communication Engineering",
    "B.Tech Artificial Intelligence and Data Science",
    "B.E. Computer Science and Business Systems",
    "B.E. Mechanical Engineering",
    "B.E. Biomedical Engineering",
    "M.E. Computer Science and Engineering",
    "M.E. Applied Electronics"
  ],
  "KG College of Arts and Science (KGCAS)": [
    "B.Sc Computer Science",
    "B.Sc Information Technology",
    "B.C.A (Computer Applications)",
    "B.Sc Psychology",
    "B.Sc Biotechnology",
    "B.Sc Mathematics",
    "B.Sc Physics",
    "B.Sc Visual Communication",
    "B.Com (General)",
    "B.Com (Computer Applications)",
    "B.Com (Professional Accounting)",
    "B.Com (Information Technology)",
    "B.Com (Accounting and Finance)",
    "B.Com (Business Analytics)",
    "B.B.A (Business Administration)",
    "B.A. English Literature",
    "M.Sc Software Systems",
    "M.Sc Computer Science",
    "M.Sc Biotechnology",
    "M.Com",
    "M.A. English Literature",
    "Ph.D Computer Science"
  ],
  "KGiSL Institute of Information Management (KGIIM)": [
    "Master of Business Administration (MBA)",
    "Master of Computer Applications (MCA)"
  ],
  "KG College of Nursing": [
    "B.Sc Nursing",
    "M.Sc Nursing (Medical Surgical)",
    "M.Sc Nursing (Paediatrics)",
    "M.Sc Nursing (Obstetrics & Gynaecology)",
    "Post Basic B.Sc Nursing",
    "Diploma in General Nursing and Midwifery (GNM)"
  ],
  "KG College of Physiotherapy": [
    "Bachelor of Physiotherapy (BPT)",
    "Master of Physiotherapy (MPT - Orthopaedics)",
    "Master of Physiotherapy (MPT - Neurology)",
    "Master of Physiotherapy (MPT - Cardio-Respiratory)"
  ],
  "KG Hospital & Post Graduate Medical Institute": [
    "DNB Cardiology",
    "DNB Nephrology",
    "DNB Radiology",
    "Post Graduate Diploma in Health Management"
  ]
};
