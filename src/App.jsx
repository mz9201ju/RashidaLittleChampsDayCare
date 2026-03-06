import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './website/SiteLayout'
import AboutPage from './website/pages/AboutPage'
import ContactPage from './website/pages/ContactPage'
import FaqPage from './website/pages/FaqPage'
import GalleryPage from './website/pages/GalleryPage'
import HomePage from './website/pages/HomePage'
import ServicesPage from './website/pages/ServicesPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FaqPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
