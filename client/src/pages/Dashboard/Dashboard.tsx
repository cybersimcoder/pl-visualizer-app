import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Box
} from '@mui/material';
import { Add as AddIcon, Upload as UploadIcon } from '@mui/icons-material';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ChartWidget from '../../components/ChartWidget/ChartWidget';
import DraggableWidget from '../../components/DraggableWidget/DraggableWidget';

interface PLStatement {
  id: number;
  title: string;
  periodStart: string;
  periodEnd: string;
  data: any;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [statements, setStatements] = useState<PLStatement[]>([]);
  const [widgets, setWidgets] = useState<any[]>([]);
  const navigate = useNavigate();

  const [{ isOver }, drop] = useDrop({
    accept: 'widget',
    drop: (item: any, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (offset) {
        // Handle widget drop
        console.log('Widget dropped:', item, offset);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    fetchStatements();
    fetchWidgets();
  }, []);

  const fetchStatements = async () => {
    try {
      const response = await axios.get('/api/pl');
      setStatements(response.data);
    } catch (error) {
      console.error('Error fetching statements:', error);
    }
  };

  const fetchWidgets = async () => {
    try {
      const response = await axios.get('/api/dashboard/widgets');
      setWidgets(response.data);
    } catch (error) {
      console.error('Error fetching widgets:', error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
              P&L Dashboard
            </Typography>
            <Box>
              <Button
                variant="contained"
                startIcon={<UploadIcon />}
                onClick={() => navigate('/upload')}
                sx={{ mr: 2 }}
              >
                Upload P&L
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => navigate('/reports')}
              >
                New Report
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            ref={drop}
            sx={{
              p: 2,
              minHeight: 400,
              backgroundColor: isOver ? 'rgba(0, 0, 0, 0.05)' : 'inherit',
              border: isOver ? '2px dashed #1976d2' : 'none'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Drag & Drop Widgets Here
            </Typography>
            {widgets.map((widget) => (
              <DraggableWidget key={widget.id} widget={widget} />
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Available Widgets
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ChartWidget
                  title="Revenue Chart"
                  type="line"
                  data={[]}
                />
              </Grid>
              <Grid item xs={12}>
                <ChartWidget
                  title="Expense Breakdown"
                  type="pie"
                  data={[]}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent P&L Statements
            </Typography>
            <Grid container spacing={2}>
              {statements.map((statement) => (
                <Grid item xs={12} md={6} lg={4} key={statement.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{statement.title}</Typography>
                      <Typography color="text.secondary">
                        {statement.periodStart} - {statement.periodEnd}
                      </Typography>
                      <Typography variant="body2">
                        Created: {new Date(statement.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;