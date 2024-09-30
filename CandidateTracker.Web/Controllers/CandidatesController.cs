using CandidateTracker.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CandidateTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private string _connectionString;
        public CandidatesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [Route("addcandidate")]
        [HttpPost]
        public void AddCandidate(Candidate candidate)
        {
            var newCandidate = new Candidate{
            FirstName = candidate.FirstName,
            LastName = candidate.LastName,
            Email = candidate.Email,
            PhoneNumber = candidate.PhoneNumber,
            Notes = candidate.Notes,
            Status = Status.Pending
            };
            var repo = new CandidateRepository(_connectionString);
            repo.AddCandidate(newCandidate);
        }
        [Route("getCounts")]
        [HttpGet]
        public object GetCounts()
        {
            var repo = new CandidateRepository(_connectionString);
            return new { pendingCount = repo.GetPendingCount(), confirmedCount = repo.GetConfirmedCount(), refusedCount = repo.GetRefusedCount() };
        }

        //[Route("getCandidatesByStatus")]
        //[HttpGet]
        //public List<Candidate> getCandidatesByStatus(StatusRequest request)
        //{
        //    var repo = new CandidateRepository(_connectionString);
        //    return repo.GetCandidatesByStatus(request.Status);
        //}

        [Route("getPendingCandidates")]
        [HttpGet]
        public List<Candidate> getPendingCandidates()
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetPendingCandidates();
        }
        [Route("getConfirmedCandidates")]
        [HttpGet]
        public List<Candidate> getConfirmedCandidates()
        { 
            var repo = new CandidateRepository(_connectionString);
            return repo.GetConfirmedCandidates();
        }
        [Route("getRefusedCandidates")]
        [HttpGet]
        public List<Candidate> getRefusedCandidates()
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetRefusedCandidates();
        }
        [Route("getCandidateById")]
        [HttpGet]
        public Candidate GetCandidateById(int id)
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetCandidateById(id);
        }
        [Route("confirmCandidate")]
        [HttpPost]
        public void ConfirmCandidate(ConfirmCandidateRequest request)
        {
            var repo = new CandidateRepository(_connectionString);
            repo.ConfirmCandidate(request.Id);
        }
        [Route("refuseCandidate")]
        [HttpPost]
        public void RefuseCandidate(ConfirmCandidateRequest request)
        {
            var repo = new CandidateRepository(_connectionString);
            repo.RefuseCandidate(request.Id);
        }

    }
    public class ConfirmCandidateRequest
    {
        public int Id { get; set; }
    }

}
