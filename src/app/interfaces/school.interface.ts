import { Entity } from './entity.interface';
export interface School extends Entity {
    name: string,
    url: string,
    category: string,
    compensation: {
        hourlyRate: {
            min: number,
            max: number,
            avg: number
        },
        salary: {
            min: number,
            max: number,
            avg: number
        },
      };
    
      about: {
        abstract: string,
        streetAddress: string,
        city: string,
        state: string,
        zip: string,
        website: string,
        admissionsUrl: string,
        wikiUrl: string,
        percentStem: number,
        graduationRate: number,
        percentStayInState: number,
        percentReceivingPellGrants: number,
        studentsEnrolled: number,
        satScores: {
            lowerPercentile: number,
            upperPercentile: number
        }
        actScores:{
           lowerPercentile: number,
           upperPercentile: number
        },
      };  
      roi: {
          totalCostOnCampus: number,
          totalCostOffCampus: number,
          net20YearRoiOnCampus: number,
          net20YearRoiOffCampus: number,
          net20YearRoiWithAidOnCampus: number,
          net20YearRoiWithAidOffCampus: number,
          annualizedRoiOnCampus: number,
          annualizedRoiOffCampus: number,
          annualizedRoiWithAidOnCampus: number, 
          annualizedRoiWithAidOffCampus: number,
          graduationRate: number,
          typicalYearsToGraduate: number,
          percentReceivingGrantMoney: number,
          averageLoanAmount4Years: number,
          overallRank: number        
      };   
      salary: {
          earlyCareerMedianPay: number,
          midCareerMedianPay: number,
          percentHighMeaning: number,
          percentMale: number,
          percentFemale: number,
          percentStem: number,
          percentPell: number,
          percentRecommending: number,
          undergraduateEnrollment: number,
          rank: number
      }; 
    
      byDimension: {
        experience: {
            entryLevel: {
              profileCount: number
            },
            earlyCareer: {
              profileCount: number
            },
            midCareer: {
              profileCount: number
            },
            lateCareer: {
              profileCount: number
            },
            experienced: {
              profileCount: number
            }
        },
        gender: {
            male: {
              profileCount: number,
              min: number,
              max: number,
              avg: number
            },
            female: {
              profileCount: number,
              min: number,
              max: number,
              avg: number
            }
        }
      } 
}