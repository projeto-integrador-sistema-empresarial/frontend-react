import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';

interface Training {
  _id: string;
  name: string;
  cod: string;
  desc: string;
  workload: string;
  enroll_start: string;
  enroll_end: string;
  min_students: string;
  max_students: string;
  training_start: string;
  training_end: string;
  created_by: string;
  enrolled: boolean;
  all_questions: string[];
}

export function Courses() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [enrolledTrainings, setEnrolledTrainings] = useState<Training[]>([]);

  useEffect(() => {
    api.get('/api/trainings')
      .then((response) => {
        console.log('.then ~ response:', response);

        setTrainings(response.data);
        checkEnrollmentStatus(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const checkEnrollmentStatus = async (trainings: Training[]) => {
    const enrolledCourses: Training[] = [];
    for (const training of trainings) {

      await api.post('/api/trainings/is-enrolled', { cod: training.cod })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            enrolledCourses.push(training);
          }
        }).catch((error) => console.log(error));
    }
    setEnrolledTrainings(enrolledCourses);
  };

  return (
    <>
      <Typography variant="h4" component="h4">Cursos</Typography>
      <Grid container spacing={2} my={2}>
        {enrolledTrainings.map((training) => (
          <Grid item xs={12} sm={6} md={4} key={training._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h5" gutterBottom>{training.name}</Typography>
                <Typography variant="body1" component="p" color="text.secondary" gutterBottom>{training.desc}</Typography>

                <Typography variant="body1" component="p" gutterBottom>Duração: {training.workload} horas</Typography>

                <Button
                  variant="contained"
                  // onClick={() => { }}
                  sx={{ my: 1 }}
                >
                  {'Fazer Curso'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
