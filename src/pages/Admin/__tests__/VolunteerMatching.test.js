import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VolunteerMatching, {
 VolunteerMatchingService,
 volunteersData,
 eventRequirements
} from '../VolunteerMatching';


describe('VolunteerMatchingService', () => {
 // Keep track of original volunteers data
 const originalVolunteers = [...volunteersData];
  // Reset volunteers data after each test
 afterEach(() => {
   while (volunteersData.length) volunteersData.pop();
   originalVolunteers.forEach(v => volunteersData.push(v));
 });


 describe('Event Validation and Matching', () => {
   it('should validate events correctly', () => {
     // Valid event
     expect(VolunteerMatchingService.validateEvent('food-drive').isValid).toBe(true);
    
     // Empty event
     const emptyResult = VolunteerMatchingService.validateEvent('');
     expect(emptyResult.isValid).toBe(false);
     expect(emptyResult.error).toBe('Event selection is required');
    
     // Invalid event
     const invalidResult = VolunteerMatchingService.validateEvent('invalid-event');
     expect(invalidResult.isValid).toBe(false);
     expect(invalidResult.error).toBe('Please select a valid event');
   });


   it('should match volunteers based on skills, experience, and time preferences', () => {
     // Test volunteer with all requirements for Fundraisers
     const perfectMatch = {
       id: 'perfect',
       name: 'Perfect Match',
       skills: ['Assisting'],
       preferences: 'Day',
       experienceLevel: 'Intermediate',
       availability: ['Monday']
     };
     volunteersData.push(perfectMatch);


     // Test Fundraisers matching (requires Intermediate+ and Assisting skill)
     const fundraiserMatches = VolunteerMatchingService.matchVolunteers('Fundraisers');
     expect(fundraiserMatches).toContainEqual(expect.objectContaining({
       skills: expect.arrayContaining(['Assisting']),
       experienceLevel: 'Intermediate'
     }));


     // Test Donation matching (requires Beginner+ and Day preference)
     const donationMatch = {
       id: 'donation',
       name: 'Donation Match',
       skills: ['Assisting'],
       preferences: 'Day',
       experienceLevel: 'Beginner',
       availability: ['Monday']
     };
     volunteersData.push(donationMatch);


     const donationMatches = VolunteerMatchingService.matchVolunteers('donation');
     expect(donationMatches.some(v => v.preferences === 'Day' && v.skills.includes('Assisting'))).toBe(true);


     // Test error handling
     expect(() => {
       VolunteerMatchingService.matchVolunteers('invalid-event');
     }).toThrow('Please select a valid event');
   });


   it('should calculate match quality correctly', () => {
     const testVolunteer = {
       id: 'test',
       name: 'Test Volunteer',
       skills: ['Packing', 'Cooking'],
       preferences: 'Day',
       experienceLevel: 'Expert',
       availability: ['Monday']
     };


     // Test multiple skills matching
     const foodDriveQuality = VolunteerMatchingService.getMatchQuality(testVolunteer, 'food-drive');
     expect(foodDriveQuality.matchingSkills).toBe(2);
     expect(foodDriveQuality.timePreference).toBe(true);


     // Test no skills matching
     const noSkillsVolunteer = { ...testVolunteer, skills: ['Unknown'] };
     expect(VolunteerMatchingService.getMatchQuality(noSkillsVolunteer, 'food-drive').matchingSkills).toBe(0);
   });
 });
});


describe('VolunteerMatching Component', () => {
 beforeEach(() => {
   render(<VolunteerMatching />);
 });


 it('should handle event selection and display results correctly', () => {
   // Check initial state
   expect(screen.getByText('Volunteer Matching Form')).toBeInTheDocument();
   expect(screen.getByText('Select an event to find matching volunteers.')).toBeInTheDocument();


   // Check event selection and results display
   const select = screen.getByLabelText('Select an Event');
   fireEvent.change(select, { target: { value: 'food-drive' } });
   expect(screen.getByText(/Matching Volunteers/)).toBeInTheDocument();


   // Check volunteer details display
   const volunteerInfo = screen.getAllByTestId('volunteer-info');
   expect(volunteerInfo[0]).toHaveTextContent(/Skills:/);
   expect(volunteerInfo[0]).toHaveTextContent(/Experience:/);


   // Check empty selection
   fireEvent.change(select, { target: { value: '' } });
   expect(screen.getByText('Select an event to find matching volunteers.')).toBeInTheDocument();
 });


 it('should handle errors appropriately', () => {
   // Mock error case
   const mockMatchVolunteers = jest.spyOn(VolunteerMatchingService, 'matchVolunteers');
   mockMatchVolunteers.mockImplementationOnce(() => {
     throw new Error("Test error message");
   });


   const select = screen.getByLabelText('Select an Event');
   fireEvent.change(select, { target: { value: 'food-drive' } });
  
   expect(screen.getByText("Test error message")).toBeInTheDocument();
   expect(screen.queryByTestId('volunteer-info')).not.toBeInTheDocument();


   mockMatchVolunteers.mockRestore();
 });
});
