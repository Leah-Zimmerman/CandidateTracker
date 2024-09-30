using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CandidateTracker.Data
{
    public class CandidateRepository
    {
        private string _connectionString;
        public CandidateRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddCandidate(Candidate candidate)
        {
            using var context = new CandidateDbContext(_connectionString);
            context.Add(candidate);
            context.SaveChanges();
        }
        public int GetPendingCount()
        {
            using var context = new CandidateDbContext(_connectionString);
            return context.Candidates.Count(c =>c.Status == Status.Pending);
        }
        public int GetConfirmedCount()
        {
            using var context = new CandidateDbContext(_connectionString);
            return context.Candidates.Count(c => c.Status == Status.Confirmed);
        }
        public int GetRefusedCount()
        {
            using var context = new CandidateDbContext(_connectionString);
            return context.Candidates.Count(c => c.Status == Status.Refused);
        }
        public List<Candidate> GetPendingCandidates()
        {
            using var context = new CandidateDbContext(_connectionString);
            return context.Candidates.Where(c => c.Status == Status.Pending).ToList();
        }
        public List<Candidate> GetConfirmedCandidates()
        {
            using var context = new CandidateDbContext(_connectionString);
            return context.Candidates.Where(c => c.Status == Status.Confirmed).ToList();
        }
        public List<Candidate> GetRefusedCandidates()
        {
            using var context = new CandidateDbContext(_connectionString);
            return context.Candidates.Where(c => c.Status == Status.Refused).ToList();
        }

        public List<Candidate> GetCandidatesByStatus(string status)
        {
            using var context = new CandidateDbContext(_connectionString);
            Status statusEnum = (Status)Enum.Parse(typeof(Status), status, true);
            return context.Candidates.Where(c => c.Status == statusEnum).ToList();
        }
        public Candidate GetCandidateById(int id)
        {
            using var context = new CandidateDbContext(_connectionString);
            return context.Candidates.FirstOrDefault(c => c.Id == id);
        }
        public void ConfirmCandidate(int id)
        {
            using var context = new CandidateDbContext(_connectionString);
            var cand = context.Candidates.FirstOrDefault(c=>c.Id==id);
            cand.Status = Status.Confirmed;
            context.SaveChanges();
        }
        public void RefuseCandidate(int id)
        {
            using var context = new CandidateDbContext(_connectionString);
            var cand = context.Candidates.FirstOrDefault(c => c.Id == id);
            cand.Status = Status.Refused;
            context.SaveChanges();
        }

    }
}
