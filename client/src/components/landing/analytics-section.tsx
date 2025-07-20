export function AnalyticsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-purple-600 dark:text-purple-400 font-semibold text-lg">Performance Analytics</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                Advanced Analytics &
                <br />
                <span className="text-purple-600 dark:text-purple-400">Performance Insights</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Track your progress with detailed analytics, identify weak areas, and get personalized recommendations
                to improve your test performance.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-purple-600 dark:bg-purple-400 rounded-lg"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Detailed Performance Reports</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get comprehensive reports showing your strengths, weaknesses, and areas that need improvement across
                    all subjects.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-orange-500 dark:bg-orange-400 rounded-lg"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Smart Recommendations</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Receive AI-powered suggestions for topics to focus on and practice tests tailored to your learning
                    needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <img
                src="https://illustrations.popsy.co/amber/analytics.svg"
                alt="Analytics Dashboard illustration"
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Floating stats */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">95%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy Rate</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1,247</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Tests Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
