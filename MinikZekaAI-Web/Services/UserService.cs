namespace MinikZekaAI_Web.Services
{
    public class UserService : IUserService
    {
        private string _studentName;
        private int _studentGrade;
        public string StudentName {
            get => _studentName;
            set => _studentName = value;
        }
        public int StudentGrade {
            get => _studentGrade;
            set => _studentGrade = value;
        }
    }
}
