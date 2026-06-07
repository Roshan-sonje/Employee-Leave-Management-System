package com.jsp.elms.dto;

public class DashboardResponse {
	private long totalEmployees;
    private long totalLeaves;
    private long approvedLeaves;
    private long rejectedLeaves;
    private long pendingLeaves;
    
    public DashboardResponse() {
	}

	public DashboardResponse(long totalEmployees, long totalLeaves, long approvedLeaves, long rejectedLeaves,
			long pendingLeaves) {
		super();
		this.totalEmployees = totalEmployees;
		this.totalLeaves = totalLeaves;
		this.approvedLeaves = approvedLeaves;
		this.rejectedLeaves = rejectedLeaves;
		this.pendingLeaves = pendingLeaves;
	}

	public long getTotalEmployees() {
		return totalEmployees;
	}

	public void setTotalEmployees(long totalEmployees) {
		this.totalEmployees = totalEmployees;
	}

	public long getTotalLeaves() {
		return totalLeaves;
	}

	public void setTotalLeaves(long totalLeaves) {
		this.totalLeaves = totalLeaves;
	}

	public long getApprovedLeaves() {
		return approvedLeaves;
	}

	public void setApprovedLeaves(long approvedLeaves) {
		this.approvedLeaves = approvedLeaves;
	}

	public long getRejectedLeaves() {
		return rejectedLeaves;
	}

	public void setRejectedLeaves(long rejectedLeaves) {
		this.rejectedLeaves = rejectedLeaves;
	}

	public long getPendingLeaves() {
		return pendingLeaves;
	}

	public void setPendingLeaves(long pendingLeaves) {
		this.pendingLeaves = pendingLeaves;
	}
    
    
}
