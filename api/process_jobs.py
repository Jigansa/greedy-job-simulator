from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

def shortest_job_first(jobs):
    """
    Implements the Shortest Job First (SJF) scheduling algorithm.
    
    Args:
        jobs: List of job dictionaries with id, arrivalTime, executionTime, deadline, and weight
        
    Returns:
        Dictionary with scheduling results and metrics
    """
    # Sort jobs by execution time (shortest first)
    sorted_jobs = sorted(jobs, key=lambda x: x['executionTime'])
    
    current_time = 0
    total_turnaround_time = 0
    job_schedule = []
    
    for job in sorted_jobs:
        # Job can't start before its arrival time
        start_time = max(current_time, job['arrivalTime'])
        end_time = start_time + job['executionTime']
        
        job_schedule.append({
            'jobId': job['id'],
            'startTime': start_time,
            'endTime': end_time
        })
        
        # Calculate turnaround time (completion time - arrival time)
        turnaround_time = end_time - job['arrivalTime']
        total_turnaround_time += turnaround_time
        
        # Update current time
        current_time = end_time
    
    # Calculate metrics
    total_execution_time = current_time
    average_turnaround_time = total_turnaround_time / len(jobs)
    
    # Calculate CPU utilization (total job execution time / total time)
    total_job_time = sum(job['executionTime'] for job in jobs)
    cpu_utilization = total_job_time / total_execution_time if total_execution_time > 0 else 0
    
    # Calculate fairness index (simplified version)
    # Higher value means more fair distribution of processing time
    fairness_index = calculate_fairness_index(jobs, job_schedule)
    
    # Calculate overall score (weighted combination of metrics)
    overall_score = calculate_overall_score(
        total_execution_time,
        average_turnaround_time,
        cpu_utilization,
        fairness_index
    )
    
    return {
        'name': 'Shortest Job First (SJF)',
        'totalExecutionTime': total_execution_time,
        'averageTurnaroundTime': average_turnaround_time,
        'cpuUtilization': cpu_utilization,
        'fairnessIndex': fairness_index,
        'overallScore': overall_score,
        'jobSchedule': job_schedule
    }

def earliest_deadline_first(jobs):
    """
    Implements the Earliest Deadline First (EDF) scheduling algorithm.
    
    Args:
        jobs: List of job dictionaries with id, arrivalTime, executionTime, deadline, and weight
        
    Returns:
        Dictionary with scheduling results and metrics
    """
    # Sort jobs by deadline (earliest first)
    sorted_jobs = sorted(jobs, key=lambda x: x['deadline'])
    
    current_time = 0
    total_turnaround_time = 0
    job_schedule = []
    
    for job in sorted_jobs:
        # Job can't start before its arrival time
        start_time = max(current_time, job['arrivalTime'])
        end_time = start_time + job['executionTime']
        
        job_schedule.append({
            'jobId': job['id'],
            'startTime': start_time,
            'endTime': end_time
        })
        
        # Calculate turnaround time (completion time - arrival time)
        turnaround_time = end_time - job['arrivalTime']
        total_turnaround_time += turnaround_time
        
        # Update current time
        current_time = end_time
    
    # Calculate metrics
    total_execution_time = current_time
    average_turnaround_time = total_turnaround_time / len(jobs)
    
    # Calculate CPU utilization (total job execution time / total time)
    total_job_time = sum(job['executionTime'] for job in jobs)
    cpu_utilization = total_job_time / total_execution_time if total_execution_time > 0 else 0
    
    # Calculate fairness index (simplified version)
    fairness_index = calculate_fairness_index(jobs, job_schedule)
    
    # Calculate overall score (weighted combination of metrics)
    overall_score = calculate_overall_score(
        total_execution_time,
        average_turnaround_time,
        cpu_utilization,
        fairness_index
    )
    
    return {
        'name': 'Earliest Deadline First (EDF)',
        'totalExecutionTime': total_execution_time,
        'averageTurnaroundTime': average_turnaround_time,
        'cpuUtilization': cpu_utilization,
        'fairnessIndex': fairness_index,
        'overallScore': overall_score,
        'jobSchedule': job_schedule
    }

def weighted_job_scheduling(jobs):
    """
    Implements the Weighted Job Scheduling algorithm.
    
    Args:
        jobs: List of job dictionaries with id, arrivalTime, executionTime, deadline, and weight
        
    Returns:
        Dictionary with scheduling results and metrics
    """
    # Sort jobs by weight/profit (highest first)
    sorted_jobs = sorted(jobs, key=lambda x: x['weight'], reverse=True)
    
    current_time = 0
    total_turnaround_time = 0
    job_schedule = []
    
    for job in sorted_jobs:
        # Job can't start before its arrival time
        start_time = max(current_time, job['arrivalTime'])
        end_time = start_time + job['executionTime']
        
        job_schedule.append({
            'jobId': job['id'],
            'startTime': start_time,
            'endTime': end_time
        })
        
        # Calculate turnaround time (completion time - arrival time)
        turnaround_time = end_time - job['arrivalTime']
        total_turnaround_time += turnaround_time
        
        # Update current time
        current_time = end_time
    
    # Calculate metrics
    total_execution_time = current_time
    average_turnaround_time = total_turnaround_time / len(jobs)
    
    # Calculate CPU utilization (total job execution time / total time)
    total_job_time = sum(job['executionTime'] for job in jobs)
    cpu_utilization = total_job_time / total_execution_time if total_execution_time > 0 else 0
    
    # Calculate fairness index (simplified version)
    fairness_index = calculate_fairness_index(jobs, job_schedule)
    
    # Calculate overall score (weighted combination of metrics)
    overall_score = calculate_overall_score(
        total_execution_time,
        average_turnaround_time,
        cpu_utilization,
        fairness_index
    )
    
    return {
        'name': 'Weighted Job Scheduling',
        'totalExecutionTime': total_execution_time,
        'averageTurnaroundTime': average_turnaround_time,
        'cpuUtilization': cpu_utilization,
        'fairnessIndex': fairness_index,
        'overallScore': overall_score,
        'jobSchedule': job_schedule
    }

def calculate_fairness_index(jobs, schedule):
    """
    Calculate a fairness index based on how equitably CPU time is distributed.
    
    This is a simplified implementation of Jain's fairness index.
    """
    if not jobs:
        return 0
    
    # Map job IDs to their execution times
    job_exec_times = {job['id']: job['executionTime'] for job in jobs}
    
    # Calculate the ratio of allocated time to requested time for each job
    ratios = []
    for job_schedule in schedule:
        job_id = job_schedule['jobId']
        allocated_time = job_schedule['endTime'] - job_schedule['startTime']
        requested_time = job_exec_times.get(job_id, 0)
        
        if requested_time > 0:
            ratios.append(allocated_time / requested_time)
    
    if not ratios:
        return 0
    
    # Jain's fairness index: (sum(x))^2 / (n * sum(x^2))
    sum_ratios = sum(ratios)
    sum_squared_ratios = sum(r**2 for r in ratios)
    n = len(ratios)
    
    if sum_squared_ratios == 0:
        return 0
    
    fairness = (sum_ratios**2) / (n * sum_squared_ratios)
    return fairness

def calculate_overall_score(total_execution_time, avg_turnaround_time, cpu_utilization, fairness_index):
    """
    Calculate an overall performance score based on the metrics.
    
    Higher score is better.
    """
    # Normalize metrics to a 0-100 scale (simplified)
    # For execution time and turnaround time, lower is better
    exec_time_score = 100 / (1 + total_execution_time/10)
    turnaround_score = 100 / (1 + avg_turnaround_time/5)
    
    # For CPU utilization and fairness, higher is better
    cpu_score = cpu_utilization * 100
    fairness_score = fairness_index * 100
    
    # Weighted combination
    weights = {
        'exec_time': 0.25,
        'turnaround': 0.25,
        'cpu': 0.25,
        'fairness': 0.25
    }
    
    overall_score = (
        weights['exec_time'] * exec_time_score +
        weights['turnaround'] * turnaround_score +
        weights['cpu'] * cpu_score +
        weights['fairness'] * fairness_score
    )
    
    return overall_score

@app.route('/api/process_jobs', methods=['POST'])
def process_jobs_api():
    """API endpoint to process jobs using all three algorithms"""
    try:
        jobs = request.json.get('jobs', [])
        
        if not jobs:
            return jsonify({'error': 'No jobs provided'}), 400
        
        # Run all three algorithms
        sjf_result = shortest_job_first(jobs)
        edf_result = earliest_deadline_first(jobs)
        weighted_result = weighted_job_scheduling(jobs)
        
        return jsonify({
            'results': [sjf_result, edf_result, weighted_result]
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
