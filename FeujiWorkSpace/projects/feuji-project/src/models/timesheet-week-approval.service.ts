import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Accountproject } from './accountproject.model';
import { timesheetWeekApproval } from './timesheet-week-approval.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetWeekApprovalService {
  private accurl = 'http://13.48.82.196:8084/api/timesheet/getaccountdetails';
  private apiUrl = 'http://13.48.82.196:8084/api/TimesheetWeekSummaryView';
  private accountUrl='http://13.48.82.196:8084/api/timesheet'
  private weekTimeSheet: timesheetWeekApproval[]=[];
  constructor(private http: HttpClient) {}
  getAccounts(): Observable<any[]> {
    const url = `${this.accurl}?userEmpId=${107}`;
    return this.http.get<any[]>(url);
  }

  fetchData(month: string, year: number,accountId:number): Observable<any[]> {
    const url = `${this.accountUrl}/gettimeSheetHistory/bymonth/${month}/${year}/${accountId}`;

    return this.http.get<any[]>(url);
  }

  getProjects(userEmpId:number,month:string,year:number,accountId: number,employeeId:number): Observable<timesheetWeekApproval[]> {
    const url = `${this.apiUrl}/getTimeSheeApproval/${userEmpId}/${month}/${year}/${accountId}/${employeeId}`;
  
    return this.http.get<timesheetWeekApproval[]>(url);

    
   
  }

  getProjectsByAccountId(userEmpId:number,year:number,accountId: number): Observable<timesheetWeekApproval[]> {
    const url = `${this.apiUrl}/getTimeSheeApproval/${userEmpId}/${year}/${accountId}`;
    return this.http.get<timesheetWeekApproval[]>(url);
  }
  getStoredWeekTimesheets(): timesheetWeekApproval[] {
    return this.weekTimeSheet;
  }


  getTotalHours(employeeId:number,accountProjectId:number,weekNumber:number):Observable<timesheetWeekApproval[]>{
    const url=`${this.apiUrl}/total/${employeeId}/${accountProjectId}/${weekNumber}`;
    return this.http.get<timesheetWeekApproval[]>(url)
  }

  getAllEmployee(userEmpId:number,accountProjectId:number):Observable<timesheetWeekApproval[]>{
    const url=`${this.accountUrl}/getemployeedetails/107/${accountProjectId}`;
    return this.http.get<timesheetWeekApproval[]>(url)
    
  }
  getAllApprovalDetails(reportingManagerId:number):Observable<timesheetWeekApproval[]>{
    const url=`${this.accountUrl}/getAllEmployee/107`;
    return this.http.get<timesheetWeekApproval[]>(url)
  }


}