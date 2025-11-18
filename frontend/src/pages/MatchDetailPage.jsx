import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { matchService } from '../services/matchService';
import Header from '../components/Header';

const MatchDetailPage = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatch();
  }, [id]);

  const fetchMatch = async () => {
    try {
      const data = await matchService.getMatch(id);
      setMatch(data.match);
    } catch (error) {
      console.error('Error fetching match:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!match) return <div className="text-center py-12">Match not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Match Details</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="text-2xl font-bold mb-4">Match Information</h2>
              <div className="space-y-3">
                <p><span className="font-semibold">Status:</span> {match.status}</p>
                <p><span className="font-semibold">You teach:</span> {match.skillExchanged?.user1Teaches}</p>
                <p><span className="font-semibold">You learn:</span> {match.skillExchanged?.user2Teaches}</p>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Chat</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
                {match.chatHistory?.length === 0 ? (
                  <p className="text-gray-500 text-center">No messages yet</p>
                ) : (
                  match.chatHistory?.map((msg, index) => (
                    <div key={index} className="mb-3">
                      <p className="text-sm text-gray-600">{new Date(msg.timestamp).toLocaleString()}</p>
                      <p>{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Type a message..."
                />
                <button className="btn-primary">Send</button>
              </div>
            </div>
          </div>

          <div>
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Partner</h2>
              <div className="text-center">
                <img
                  src={match.user2?.photo || '/default-avatar.png'}
                  alt={match.user2?.name}
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="font-bold text-lg">{match.user2?.name}</h3>
                <p className="text-gray-600">{match.user2?.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailPage;
